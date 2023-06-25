<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait UploadImageTrait
{
    public function uploadImage(Request $request, $folder, $identifier = 'image', $disk = 'wasabi')
    {
        if ($request->hasFile($identifier)) {
            $imagePath = $request->file($identifier)->storePublicly($folder, $disk);
            return $imagePath;
        }
        return null;
    }

    public function deleteImage($imagePath, $disk = 'wasabi')
    {
        if ($imagePath) {
            Storage::disk($disk)->delete($imagePath);
        }
    }
}