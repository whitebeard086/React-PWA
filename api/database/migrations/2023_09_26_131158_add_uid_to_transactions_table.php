<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('transactions', function (Blueprint $table) {
            // Add the uid column without the unique constraint.
            $table->uuid('uid')->after('id')->nullable();
        });

        // Generate a unique uid for all existing transactions.
        DB::table('transactions')->get()->each(function ($transaction) {
            DB::table('transactions')
                ->where('id', $transaction->id)
                ->update(['uid' => Str::uuid()]);
        });

        // Now add the unique constraint to the uid column.
        Schema::table('transactions', function (Blueprint $table) {
            $table->uuid('uid')->after('id')->unique()->change();
        });
    }

    
    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('uid');
        });
    }
};
