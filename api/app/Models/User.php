<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'username',
        'profile_type_id',
        'slug',
        'phone',
        'phone_verified_at',
        'profile_views',
        'transaction_pin',
        'account_level_id',
        'pending_account_level',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'transaction_pin',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'transaction_pin' => 'hashed',
        'profile_type_id' => 'float',
        'balance' => 'float',
        'profile_views' => 'float',
    ];

    public function ProfileType()
    {
        return $this->belongsTo(ProfileType::class);
    }

    public function Service()
    {
        return $this->hasOne(Service::class);
    }

    public function Transactions()
    {
        return $this->hasMany(Transaction::class)->orderBy('id', 'desc');
    }

    public function Chats()
    {
        return $this->hasMany(Chat::class);
    }

    public function Escrows()
    {
        return $this->hasMany(Escrow::class);
    }

    public function Bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function WithdrawalAccounts()
    {
        return $this->hasMany(WithdrawalAccount::class);
    }

    public function kycSubmissions()
    {
        return $this->hasMany(KYCSubmission::class);
    }

    public function accountLevel()
    {
        return $this->belongsTo(AccountLevel::class);
    }
}