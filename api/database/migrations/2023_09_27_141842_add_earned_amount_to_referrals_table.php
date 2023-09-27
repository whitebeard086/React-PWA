<?php

use App\Models\SystemConfigurations;
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
        Schema::table('referrals', function (Blueprint $table) {
            // $system = SystemConfigurations::where('id', 1)->first();
            $table->decimal('earned_bonus', 20, 2)->after('referred_id')->default(200.00);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('referrals', function (Blueprint $table) {
            $table->dropColumn('earned_bonus');
        });
    }
};