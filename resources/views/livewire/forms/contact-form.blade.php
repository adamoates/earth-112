<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;
use Illuminate\Support\Facades\Mail;

new #[Layout('layouts.guest')] class extends Component {
    public string $name = '';
    public string $email = '';
    public string $subject = '';
    public string $message = '';

    public function submit()
    {
        $this->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email',
            'subject' => 'required|string|max:150',
            'message' => 'required|string|max:5000',
        ]);

        // For now, just show success message
        session()->flash('success', 'Your message has been sent.');

        $this->reset(['name', 'email', 'subject', 'message']);
    }
}; ?>

<div class="max-w-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Contact Us</h1>

    @if (session()->has('success'))
        <div class="p-2 bg-green-100 text-green-700 rounded mb-4">
            {{ session('success') }}
        </div>
    @endif

    <form wire:submit.prevent="submit" class="space-y-4">
        <input type="text" wire:model="name" placeholder="Your name" class="w-full border p-2 rounded" />
        @error('name')
            <span class="text-red-500 text-sm">{{ $message }}</span>
        @enderror

        <input type="email" wire:model="email" placeholder="Your email" class="w-full border p-2 rounded" />
        @error('email')
            <span class="text-red-500 text-sm">{{ $message }}</span>
        @enderror

        <input type="text" wire:model="subject" placeholder="Subject" class="w-full border p-2 rounded" />
        @error('subject')
            <span class="text-red-500 text-sm">{{ $message }}</span>
        @enderror

        <textarea wire:model="message" placeholder="Your message" class="w-full border p-2 rounded"></textarea>
        @error('message')
            <span class="text-red-500 text-sm">{{ $message }}</span>
        @enderror

        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
    </form>
</div>
