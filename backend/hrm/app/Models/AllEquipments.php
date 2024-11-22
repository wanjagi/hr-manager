<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AllEquipments extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'serial_number', 'description'
    ];
}
