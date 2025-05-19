<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'first_name'     => 'required|string|max:50',
            'last_name'      => 'required|string|max:50',
            'name'           => 'required|string|max:50',
            'gender'         => 'required|in:male,female',
            'email'          => 'required|email|unique:users,email',
            'avatar_url'     => 'nullable|url',
            'phone_number'   => ['nullable', 'regex:/^\(\d{3}\) \d{3}-\d{4}$/'],
            'birthday'       => 'nullable|date|before:-18 years|after:-66 years',
            'password' => ['required', 'string', 'min:8'],
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
