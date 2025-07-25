<?php

namespace App\Config;

use Illuminate\Support\Facades\Validator;

class AwsConfig
{
    public static function getConfig(): array
    {
        return [
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'access_key_id' => env('AWS_ACCESS_KEY_ID'),
            'secret_access_key' => env('AWS_SECRET_ACCESS_KEY'),
            'bucket' => env('AWS_BUCKET'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'endpoint' => env('AWS_ENDPOINT'),
            'url' => env('AWS_URL'),
            's3' => [
                'bucket' => env('AWS_BUCKET'),
                'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
                'url' => env('AWS_URL'),
                'endpoint' => env('AWS_ENDPOINT'),
                'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            ],
        ];
    }

    public static function isConfigured(): bool
    {
        $config = self::getConfig();
        return !empty($config['access_key_id']) &&
            !empty($config['secret_access_key']) &&
            !empty($config['bucket']);
    }

    public static function validate(): array
    {
        $config = self::getConfig();

        $validator = Validator::make($config, [
            'access_key_id' => 'required|string',
            'secret_access_key' => 'required|string',
            'bucket' => 'required|string',
            'region' => 'required|string',
        ]);

        return [
            'valid' => !$validator->fails(),
            'errors' => $validator->errors()->all(),
        ];
    }

    public static function getBucketUrl(): ?string
    {
        $config = self::getConfig();
        return $config['url'] ?? null;
    }

    public static function getS3Config(): array
    {
        return self::getConfig()['s3'];
    }
}
