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
        Schema::table('system_configurations', function (Blueprint $table) {
            $table->decimal('data_discount', 20, 2)->after('id')->default(0.00);
            $table->decimal('airtime_discount', 20, 2)->after('id')->default(0.00);
            $table->decimal('service_commission', 20, 2)->after('id')->default(0.00);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('system_configurations', function (Blueprint $table) {
            $table->dropColumn('data_discount');
            $table->dropColumn('airtime_discount');
            $table->dropColumn('service_commission');
        });
    }
};