<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvoicePaidNotification extends Notification
{
    use Queueable;

    public $senderUsername;
    public $invoice;

    /**
     * Create a new notification instance.
     */
    public function __construct($user, $invoice)
    {
        $this->senderUsername = $user->username;
        $this->invoice = $invoice;
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
                    ->subject('Service Booked')
                    ->greeting('Hello, ' . $notifiable->username)
                    ->line('This is to inform you that we have received full payment from '.$this->senderUsername.' for invoice #'.$this->invoice->invoice_number.' you may resume work on the service now.')
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