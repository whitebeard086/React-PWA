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
            $table->string('collection_id')->nullable()->after('account_balance');
            $table->string('collection_number')->nullable()->after('collection_id');
            $table->string('collection_balance')->nullable()->after('collection_number');
            $table->string('collection_name')->nullable()->after('collection_balance');
            $table->string('collection_bank')->nullable()->after('collection_name');
            $table->string('collection_preferred')->default(0.00)->after('collection_bank');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'collection_id', 'collection_number', 'collection_balance', 'collection_name', 'collection_bank',
                'collection_preferred'
            ]);
        });
    }
};
