<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
    
class News extends Model
{
    protected $fillable = [
        'title',
        'created_by_id',
        'created_at',
        'edited_at',
        'is_public',
        'description',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'edited_at' => 'datetime',
    ];
    public function thumbnail():HasOne
    {
        return $this->hasOne(NewsComponent::class)
                    ->where('is_tumbnail', true);
    }
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function creator():BelongsTo
    {
        return $this->belongsTo(User::class, "created_by_id", "id");
    }
    public function news_components():HasMany
    {
        return $this->hasMany(NewsComponent::class)
                    ->orderBy('order');;
    }
}
