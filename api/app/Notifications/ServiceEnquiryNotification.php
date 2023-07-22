<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ServiceEnquiryNotification extends Notification
{
    use Queueable;
    
    public $mailer;
    public $senderUsername;

    /**
     * Create a new notification instance.
     */
    public function __construct($sender)
    {
        $this->mailer = "smtp";
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
                    ->mailer($this->mailer)
                    ->subject('New Service Enquiry')
                    ->greeting('Hello, ' . $notifiable->username)
                    ->line('You have a new service enquiry from '. $this->senderUsername. ', please check your requests and respond accordingly.')
                    ->action('Requests', url(env('APP_ENV') == 'local' ? env('APP_DEV_URL').'requests' : env('APP_URL').'requests'))
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