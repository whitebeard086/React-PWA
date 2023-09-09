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
        Schema::create('disputes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->foreignId('disputer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('client_id')->constrained('users');
            $table->foreignId('provider_id')->constrained('users');
            $table->foreignId('invoice_id')->constrained('invoices')->onDelete('cascade');
            $table->longText('description');
            $table->enum('status', ['open', 'resolved'])->default('open');
            $table->timestamp('respond_before');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disputes');
    }
};