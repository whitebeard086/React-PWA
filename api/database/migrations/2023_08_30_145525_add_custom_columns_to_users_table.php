<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('customer_id')->nullable()->after('id');
            $table->string('bvn')->nullable()->after('bank');
            $table->string('preferred_bank')->nullable()->after('bvn');
            $table->string('alias')->nullable()->after('preferred_bank');
            $table->string('wallet_id')->nullable()->after('alias');
            $table->string('wallet_number')->nullable()->after('wallet_id');
            $table->decimal('wallet_balance', 20, 2)->default(0.00)->after('wallet_number');
            $table->string('account_id')->nullable()->after('wallet_balance');
            $table->string('account_number')->nullable()->after('account_id');
            $table->decimal('account_balance', 20, 2)->default(0.00)->after('account_number');
            $table->string('place_of_birth')->nullable()->after('remember_token');
            $table->string('dob')->nullable()->after('place_of_birth');
            $table->string('gender')->nullable()->after('dob');
            $table->foreignId('address_id')->nullable()->after('id')->constrained('addresses')->onDelete('set null');
            $table->string('kyc_tier')->default('0')->after('bvn');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['address_id']);
            $table->dropColumn([
                'customer_id', 'bvn', 'preferred_bank', 'alias', 'wallet_id', 'account_id', 'account_number', 'account_balance', 'wallet_number', 'wallet_balance',
                'place_of_birth', 'dob', 'gender', 'address_id', 'kyc_tier'
            ]);
        });
    }
};
