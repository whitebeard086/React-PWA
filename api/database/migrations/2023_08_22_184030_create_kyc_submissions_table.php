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
        Schema::create('kyc_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('document_type');
            $table->string('doc_front')->nullable();
            $table->string('doc_back')->nullable();
            $table->string('nin')->nullable();
            $table->enum('status', ['pending', 'approved', 'declined'])->default('pending');
            $table->longText('admin_notes')->nullable();
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('pending_account_level')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kyc_submissions');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('pending_account_level');
        });
    }
};
