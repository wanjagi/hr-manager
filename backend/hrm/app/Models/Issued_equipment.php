<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issued_equipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id', 'equipment_id', 'issued_date', 'return_date'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
