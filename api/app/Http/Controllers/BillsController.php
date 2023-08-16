<?php

namespace App\Http\Controllers;

use App\Traits\BillsTrait;
use Illuminate\Http\Request;

class BillsController extends Controller
{
    use BillsTrait;
    
    public function get_operators()
    {
        try {
            $operators = $this->getOperators();

            if ($operators === null) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to fetch operators',
                ], 500);
            }

            return response()->json([
                'status' => 'success',
                'operators' => $operators,
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}