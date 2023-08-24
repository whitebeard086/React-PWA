<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ServiceCompletedNotification extends Notification
{
    use Queueable;

    public $senderUsername;

    /**
     * Create a new notification instance.
     */
    public function __construct($provider)
    {
        $this->senderUsername = $provider->username;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->mailer('smtp')
                    ->subject('Service Completed')
                    ->greeting('Hello, ' . $notifiable->username)
                    ->line($this->senderUsername.' has marked your service as completed, please inspect the work and confirm if you are satisfied.')
                    ->line('If you received this in error, simply ignore the email.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}