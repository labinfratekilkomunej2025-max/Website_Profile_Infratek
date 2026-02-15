<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryImage extends Model
{
    protected $fillable = [
        'gallery_id',
        'uploaded_by_id',
        'image_path',
    ];
    public function gallery():BelongsTo
    {
        return $this->belongsTo(Gallery::class);
    }
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
