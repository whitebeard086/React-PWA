<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\AccountLevel
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property float $max_balance
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|AccountLevel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AccountLevel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AccountLevel query()
 * @method static \Illuminate\Database\Eloquent\Builder|AccountLevel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountLevel whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountLevel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountLevel whereMaxBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountLevel whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountLevel whereUpdatedAt($value)
 */
	class AccountLevel extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Address
 *
 * @property int $id
 * @property int $user_id
 * @property string $street
 * @property string $city
 * @property string $state
 * @property string $country
 * @property string $postal_code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Address newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Address newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Address query()
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereStreet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereUserId($value)
 */
	class Address extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Booking
 *
 * @property int $id
 * @property float $service_id
 * @property float $user_id
 * @property float $invoice_id
 * @property int $chat_id
 * @property string $service_status
 * @property string $user_status
 * @property string $status
 * @property float $service_commission
 * @property float $provider_commission
 * @property float $commission_rate
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property float $provider_id
 * @property float|null $rating
 * @property string|null $comment
 * @property string|null $cancel_reason
 * @property-read \App\Models\Chat $Chat
 * @property-read \App\Models\Dispute|null $Dispute
 * @property-read \App\Models\Escrow|null $Escrow
 * @property-read \App\Models\Invoice $Invoice
 * @property-read \App\Models\Service $Service
 * @property-read \App\Models\User $User
 * @method static \Illuminate\Database\Eloquent\Builder|Booking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking query()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereCancelReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereChatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereCommissionRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereProviderCommission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereServiceCommission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereServiceStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereUserStatus($value)
 */
	class Booking extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Category
 *
 * @property int $id
 * @property string $name
 * @property string|null $banner
 * @property string|null $icon
 * @property string $slug
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Service> $Services
 * @property-read int|null $services_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\SubCategory> $SubCategories
 * @property-read int|null $sub_categories_count
 * @method static \Illuminate\Database\Eloquent\Builder|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereBanner($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereUpdatedAt($value)
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Chat
 *
 * @property int $id
 * @property string|null $uid
 * @property float|null $user_id
 * @property float|null $receiver_id
 * @property string $status
 * @property string|null $notify_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Booking|null $Booking
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Invoice> $Invoices
 * @property-read int|null $invoices_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Message> $Messages
 * @property-read int|null $messages_count
 * @property-read \App\Models\User|null $Receiver
 * @property-read \App\Models\User|null $User
 * @method static \Illuminate\Database\Eloquent\Builder|Chat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat query()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereNotifyAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereUid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereUserId($value)
 */
	class Chat extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Collection
 *
 * @property int $id
 * @property string $webhook_id
 * @property string $name
 * @property string $bank_name
 * @property string|null $environment
 * @property string $account_number
 * @property string $preferred_bank
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Collection newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Collection newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Collection query()
 * @method static \Illuminate\Database\Eloquent\Builder|Collection whereAccountNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Collection whereBankName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Collection whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Collection whereEnvironment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Collection whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Collection whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Collection wherePreferredBank($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Collection whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Collection whereWebhookId($value)
 */
	class Collection extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Country
 *
 * @property int $id
 * @property string $name
 * @property int $phone
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $Users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Country newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Country newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Country query()
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country wherePhone($value)
 */
	class Country extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Dispute
 *
 * @property int $id
 * @property string|null $uid
 * @property float $booking_id
 * @property float $disputer_id
 * @property float $client_id
 * @property float $provider_id
 * @property float $invoice_id
 * @property string $description
 * @property string $status
 * @property string $respond_before
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Booking $Booking
 * @property-read \App\Models\User $Client
 * @property-read \App\Models\User $Disputer
 * @property-read \App\Models\Invoice $Invoice
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DisputeMessage> $Messages
 * @property-read int|null $messages_count
 * @property-read \App\Models\User $Provider
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute query()
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereBookingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereDisputerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereRespondBefore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereUid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereUpdatedAt($value)
 */
	class Dispute extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\DisputeMessage
 *
 * @property int $id
 * @property float $dispute_id
 * @property float $sender_id
 * @property string|null $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Dispute $Dispute
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Media> $Media
 * @property-read int|null $media_count
 * @method static \Illuminate\Database\Eloquent\Builder|DisputeMessage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DisputeMessage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DisputeMessage query()
 * @method static \Illuminate\Database\Eloquent\Builder|DisputeMessage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DisputeMessage whereDisputeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DisputeMessage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DisputeMessage whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DisputeMessage whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DisputeMessage whereUpdatedAt($value)
 */
	class DisputeMessage extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Escrow
 *
 * @property int $id
 * @property float $service_id
 * @property float $user_id
 * @property float $booking_id
 * @property float $amount
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Booking $Booking
 * @property-read \App\Models\Service $Service
 * @property-read \App\Models\User $User
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow query()
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow whereBookingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Escrow whereUserId($value)
 */
	class Escrow extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Invoice
 *
 * @property int $id
 * @property float $chat_id
 * @property float $receiver_id
 * @property string $invoice_number
 * @property float $price
 * @property string $file
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Booking|null $Booking
 * @property-read \App\Models\Chat $Chat
 * @property-read \App\Models\Dispute|null $Dispute
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InvoiceItem> $Items
 * @property-read int|null $items_count
 * @property-read \App\Models\User $Receiver
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice query()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereChatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereInvoiceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereUpdatedAt($value)
 */
	class Invoice extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\InvoiceItem
 *
 * @property int $id
 * @property float $invoice_id
 * @property string $item
 * @property float $price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Invoice $Invoice
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItem whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItem whereItem($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItem wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItem whereUpdatedAt($value)
 */
	class InvoiceItem extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\KYCSubmission
 *
 * @property int $id
 * @property int $user_id
 * @property string $document_type
 * @property string|null $doc_front
 * @property string|null $doc_back
 * @property string|null $nin
 * @property string $status
 * @property string|null $admin_notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission query()
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission whereAdminNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission whereDocBack($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission whereDocFront($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission whereDocumentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission whereNin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KYCSubmission whereUserId($value)
 */
	class KYCSubmission extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Media
 *
 * @property int $id
 * @property string|null $file
 * @property string $mediaable_type
 * @property float $mediaable_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $mediaable
 * @method static \Illuminate\Database\Eloquent\Builder|Media newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Media newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Media query()
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereMediaableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereMediaableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereUpdatedAt($value)
 */
	class Media extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Message
 *
 * @property int $id
 * @property float $chat_id
 * @property float $sender_id
 * @property string|null $message
 * @property string|null $file
 * @property string|null $invoice
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Chat $Chat
 * @method static \Illuminate\Database\Eloquent\Builder|Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message query()
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereChatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereInvoice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereUpdatedAt($value)
 */
	class Message extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Notification
 *
 * @property int $id
 * @property float|null $sender_id
 * @property float|null $receiver_id
 * @property string|null $type
 * @property string|null $data
 * @property bool $is_read
 * @property string|null $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $Receiver
 * @property-read \App\Models\User|null $Sender
 * @method static \Illuminate\Database\Eloquent\Builder|Notification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notification newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notification query()
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereIsRead($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereUrl($value)
 */
	class Notification extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProfileType
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $Users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProfileType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProfileType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProfileType query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProfileType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProfileType whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProfileType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProfileType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProfileType whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProfileType whereUpdatedAt($value)
 */
	class ProfileType extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Referral
 *
 * @property int $id
 * @property int $referrer_id
 * @property int $referred_id
 * @property float $earned_bonus
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $referred
 * @property-read \App\Models\User|null $referrer
 * @method static \Illuminate\Database\Eloquent\Builder|Referral newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral query()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereEarnedBonus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereReferredId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereReferrerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereUpdatedAt($value)
 */
	class Referral extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Service
 *
 * @property int $id
 * @property string|null $uid
 * @property float $user_id
 * @property float $category_id
 * @property float $sub_category_id
 * @property float $workdays_id
 * @property string $title
 * @property string|null $banner
 * @property string $slug
 * @property string $description
 * @property float $starting_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Booking> $Bookings
 * @property-read int|null $bookings_count
 * @property-read \App\Models\Category|null $Category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Escrow> $Escrows
 * @property-read int|null $escrows_count
 * @property-read \App\Models\SubCategory|null $SubCategory
 * @property-read \App\Models\User $User
 * @property-read \App\Models\Workdays|null $Workdays
 * @method static \Illuminate\Database\Eloquent\Builder|Service newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Service newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Service query()
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereBanner($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereStartingPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereSubCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereUid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereWorkdaysId($value)
 */
	class Service extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SubCategory
 *
 * @property int $id
 * @property string $name
 * @property float $category_id
 * @property string $slug
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category|null $Category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Service> $Services
 * @property-read int|null $services_count
 * @method static \Illuminate\Database\Eloquent\Builder|SubCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubCategory whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubCategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubCategory whereUpdatedAt($value)
 */
	class SubCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SystemConfigurations
 *
 * @property int $id
 * @property float $service_commission
 * @property float $airtime_discount
 * @property float $data_discount
 * @property float $referral_bonus
 * @property string|null $referral_pitch
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations query()
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations whereAirtimeDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations whereDataDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations whereReferralBonus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations whereReferralPitch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations whereServiceCommission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SystemConfigurations whereUpdatedAt($value)
 */
	class SystemConfigurations extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Transaction
 *
 * @property int $id
 * @property float $user_id
 * @property string|null $reference
 * @property float|null $amount
 * @property string|null $type
 * @property float|null $charge
 * @property float|null $final_amount
 * @property string|null $method
 * @property string|null $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $User
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCharge($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereFinalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereReference($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUserId($value)
 */
	class Transaction extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property int|null $address_id
 * @property string|null $customer_id
 * @property int $role_id
 * @property float $profile_type_id
 * @property string $username
 * @property string $last_name
 * @property string $first_name
 * @property string|null $image
 * @property string|null $slug
 * @property float $balance
 * @property string|null $bank
 * @property string|null $bvn
 * @property string $kyc_tier
 * @property string|null $preferred_bank
 * @property string|null $alias
 * @property string|null $wallet_id
 * @property string|null $wallet_number
 * @property string $wallet_balance
 * @property string|null $account_id
 * @property string|null $account_number
 * @property string $account_balance
 * @property string|null $collection_id
 * @property string|null $collection_number
 * @property string|null $collection_balance
 * @property string|null $collection_name
 * @property string|null $collection_bank
 * @property string $collection_preferred
 * @property string|null $virtual_acc
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $phone
 * @property string|null $phone_verified_at
 * @property mixed $password
 * @property mixed|null $transaction_pin
 * @property string|null $remember_token
 * @property string|null $place_of_birth
 * @property string|null $dob
 * @property string|null $gender
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property float $profile_views
 * @property string|null $deactivate_at
 * @property string|null $pending_account_level
 * @property int $account_level_id
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Booking> $Bookings
 * @property-read int|null $bookings_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Chat> $Chats
 * @property-read int|null $chats_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Dispute> $Disputes
 * @property-read int|null $disputes_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Escrow> $Escrows
 * @property-read int|null $escrows_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Notification> $Notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\ProfileType|null $ProfileType
 * @property-read \App\Models\Service|null $Service
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Transaction> $Transactions
 * @property-read int|null $transactions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WithdrawalAccount> $WithdrawalAccounts
 * @property-read int|null $withdrawal_accounts_count
 * @property-read \App\Models\AccountLevel|null $accountLevel
 * @property-read \App\Models\Address|null $address
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KYCSubmission> $kycSubmissions
 * @property-read int|null $kyc_submissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAccountBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAccountLevelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAccountNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAddressId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAlias($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereBank($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereBvn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCollectionBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCollectionBank($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCollectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCollectionName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCollectionNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCollectionPreferred($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeactivateAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDob($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereKycTier($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePendingAccountLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhoneVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePlaceOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePreferredBank($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProfileTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProfileViews($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTransactionPin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereVirtualAcc($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereWalletBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereWalletId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereWalletNumber($value)
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\WithdrawalAccount
 *
 * @property int $id
 * @property float $user_id
 * @property string $bank_name
 * @property float $account_number
 * @property string $account_name
 * @property string $account_type
 * @property string $recipient_code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $User
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount query()
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount whereAccountName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount whereAccountNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount whereAccountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount whereBankName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount whereRecipientCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalAccount whereUserId($value)
 */
	class WithdrawalAccount extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Workdays
 *
 * @property int $id
 * @property string $monday_start
 * @property string $monday_end
 * @property string $tuesday_start
 * @property string $tuesday_end
 * @property string $wednesday_start
 * @property string $wednesday_end
 * @property string $thursday_start
 * @property string $thursday_end
 * @property string $friday_start
 * @property string $friday_end
 * @property string $saturday_start
 * @property string $saturday_end
 * @property string $sunday_start
 * @property string $sunday_end
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Service> $Services
 * @property-read int|null $services_count
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays query()
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereFridayEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereFridayStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereMondayEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereMondayStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereSaturdayEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereSaturdayStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereSundayEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereSundayStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereThursdayEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereThursdayStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereTuesdayEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereTuesdayStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereWednesdayEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workdays whereWednesdayStart($value)
 */
	class Workdays extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\role
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|role query()
 * @method static \Illuminate\Database\Eloquent\Builder|role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|role whereUpdatedAt($value)
 */
	class role extends \Eloquent {}
}

