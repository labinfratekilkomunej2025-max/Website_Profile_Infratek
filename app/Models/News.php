<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class News extends Model
{
    protected $fillable = [
        'title',
        'created_by_id',
        'created_at',
        'edited_at',
        'is_public',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'edited_at' => 'datetime',
    ];
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function news_components():HasMany
    {
        return $this->hasMany(NewsComponent::class);
    }
}
