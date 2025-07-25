<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FeatureSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FeatureSettingsController extends Controller
{
    public function index(): Response
    {
        if (!Auth::user()->hasPermissionTo('manage_auth_settings')) {
            abort(403, 'Unauthorized action.');
        }

        $settings = FeatureSetting::getCurrent();

        return Inertia::render('admin/feature-settings', [
            'settings' => [
                'enable_beta_dashboard' => $settings->enable_beta_dashboard,
                'enable_new_notifications' => $settings->enable_new_notifications,
                'enable_user_impersonation' => $settings->enable_user_impersonation,
                'enable_audit_log' => $settings->enable_audit_log,
                'enable_maintenance_mode' => $settings->enable_maintenance_mode,
                'maintenance_message' => $settings->maintenance_message,
            ],
        ]);
    }

    public function update(Request $request)
    {
        if (!Auth::user()->hasPermissionTo('manage_auth_settings')) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'enable_beta_dashboard' => 'boolean',
            'enable_new_notifications' => 'boolean',
            'enable_user_impersonation' => 'boolean',
            'enable_audit_log' => 'boolean',
            'enable_maintenance_mode' => 'boolean',
            'maintenance_message' => 'nullable|string|max:500',
        ]);

        $settings = FeatureSetting::getCurrent();
        $settings->update($request->only([
            'enable_beta_dashboard',
            'enable_new_notifications',
            'enable_user_impersonation',
            'enable_audit_log',
            'enable_maintenance_mode',
            'maintenance_message',
        ]));

        return back()->with('success', 'Feature settings updated successfully!');
    }
}
