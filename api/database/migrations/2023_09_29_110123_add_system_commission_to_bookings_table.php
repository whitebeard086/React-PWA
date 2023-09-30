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
        Schema::table('bookings', function (Blueprint $table) {
            $table->decimal('commission_rate', 20, 2)->after('status')->default(0.00);
            $table->decimal('provider_commission', 20, 2)->after('status')->default(0.00);
            $table->decimal('service_commission', 20, 2)->after('status')->default(0.00);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn('service_commission');
            $table->dropColumn('provider_commission');
            $table->dropColumn('commission_rate');
        });
    }
};