<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\OAuthCredentialService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OAuthCredentialController extends Controller
{
    protected OAuthCredentialService $oauthService;

    public function __construct(OAuthCredentialService $oauthService)
    {
        $this->oauthService = $oauthService;
    }

    /**
     * Display the OAuth credentials management page
     */
    public function index(): Response
    {
        // Check permission
        if (!Auth::user()->hasPermissionTo('manage_auth_settings')) {
            abort(403, 'Unauthorized action.');
        }

        // Get OAuth credentials for each provider
        $oauthCredentials = [];
        $providers = ['google', 'github', 'discord', 'linkedin'];

        foreach ($providers as $provider) {
            $credential = $this->oauthService->getCredentials($provider);
            $providerInfo = $this->oauthService->getProviderInfo($provider);

            $oauthCredentials[$provider] = [
                'client_id' => $credential?->client_id ?? '',
                'client_secret' => '', // Never expose the secret in the frontend
                'redirect_uri' => $credential?->redirect_uri ?? $this->oauthService->getProviderInfo($provider)['setup_url'] ?? '',
                'scopes' => $credential?->scopes ?? \App\Models\OAuthCredential::getDefaultScopes($provider),
                'is_active' => $credential?->is_active ?? false,
                'has_valid_credentials' => $this->oauthService->hasValidCredentials($provider),
                'provider_info' => $providerInfo,
            ];
        }

        return Inertia::render('admin/oauth-credentials', [
            'oauth_credentials' => $oauthCredentials,
        ]);
    }

    /**
     * Update OAuth credentials for a specific provider
     */
    public function update(Request $request, string $provider)
    {
        // Check permission
        if (!Auth::user()->hasPermissionTo('manage_auth_settings')) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'client_id' => 'required|string',
            'client_secret' => 'required|string',
            'redirect_uri' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        $data = $request->only(['client_id', 'client_secret', 'redirect_uri', 'is_active']);

        // Validate credentials
        $validation = $this->oauthService->validateCredentials($provider, $data);

        if (!$validation['valid']) {
            return back()->withErrors(['oauth' => $validation['errors']]);
        }

        // Update credentials
        $this->oauthService->updateCredentials($provider, $data);

        return back()->with('success', ucfirst($provider) . ' OAuth credentials updated successfully.');
    }

    /**
     * Toggle OAuth provider active status
     */
    public function toggle(Request $request, string $provider)
    {
        // Check permission
        if (!Auth::user()->hasPermissionTo('manage_auth_settings')) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $this->oauthService->updateCredentials($provider, [
            'is_active' => $request->boolean('is_active'),
        ]);

        $status = $request->boolean('is_active') ? 'enabled' : 'disabled';
        return back()->with('success', ucfirst($provider) . ' OAuth provider ' . $status . ' successfully.');
    }

    /**
     * Get OAuth credentials status
     */
    public function status(string $provider)
    {
        // Check permission
        if (!Auth::user()->hasPermissionTo('manage_auth_settings')) {
            abort(403, 'Unauthorized action.');
        }

        $credential = $this->oauthService->getCredentials($provider);
        $hasValidCredentials = $this->oauthService->hasValidCredentials($provider);
        $providerInfo = $this->oauthService->getProviderInfo($provider);

        return response()->json([
            'provider' => $provider,
            'is_active' => $credential?->is_active ?? false,
            'has_valid_credentials' => $hasValidCredentials,
            'provider_info' => $providerInfo,
        ]);
    }
}
