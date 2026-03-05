<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Gallery extends Model
{
    protected $fillable = [
        'title',
        'description',
        'is_public',
        'edited_by_id',
        'created_at',
        'edited_at',
    ];
    public $timestamps = false;
    protected $casts = [
        'created_at' => 'datetime',
        'edited_at' => 'datetime',
    ];
    public function editor():BelongsTo
    {
        return $this->belongsTo(User::class, 'edited_by_id', 'id');
    }
    public function images():HasMany
    {
        return $this->hasMany(GalleryImage::class);
    }
}
