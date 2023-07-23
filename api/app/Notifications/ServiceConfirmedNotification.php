<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ServiceConfirmedNotification extends Notification
{
    use Queueable;

    public $senderUsername;

    /**
     * Create a new notification instance.
     */
    public function __construct($sender)
    {
        $this->senderUsername = $sender->username;
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
                    ->subject('Service Confirmed')
                    ->greeting('Hello, ' . $notifiable->username)
                    ->line($this->senderUsername.' has confirmed the completion of this service, we have released the payment to your Taskitly account.')
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