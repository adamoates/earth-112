<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name'     => 'sometimes|string|max:50',
            'last_name'      => 'sometimes|string|max:50',
            'gender'         => 'sometimes|in:male,female',
            'email'          => [
                'sometimes',
                'email',
                Rule::unique('users', 'email')->ignore($this->user->id),
            ],
            'company_email'  => [
                'nullable',
                'email',
                Rule::unique('users', 'company_email')->ignore($this->user->id),
            ],
            'avatar_url'     => 'nullable|url',
            'phone_number'   => ['nullable', 'regex:/^\(\d{3}\) \d{3}-\d{4}$/'],
            'birthday'       => 'nullable|date|before:-18 years|after:-66 years',
        ];
    }

    public function messages(): array
    {
        return [
            'gender.in' => 'Gender must be either male or female.',
            'birthday.before' => 'User must be at least 18 years old.',
            'birthday.after' => 'User must be younger than 66 years old.',
            'phone_number.regex' => 'Phone number must match the format (123) 456-7890.',
        ];
    }
}
