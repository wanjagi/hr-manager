<?php

namespace App\Http\Controllers;

use App\Models\Issued_equipment;
use Illuminate\Http\Request;

class IssuedEquipmentController extends Controller
{
    public function index()
    {
        return Issued_equipment::with(['employee', 'equipment'])->get();
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'user_id' => 'required|exists:user,id',
            'equipment_id' => 'required|exists:equipment,id',
            'status' => 'string|required'
        ]);

        $issuedEquipment = Issued_equipment::create($validated);
        return response()->json($issuedEquipment, 201);
    }

    public function show(Issued_equipment $issuedEquipment)
    {
        return $issuedEquipment->load(['employee', 'equipment']);
    }

    public function update(Request $request, Issued_equipment $issuedEquipment)
    {

        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'equipment_id' => 'required|exists:equipment,id',
            'issued_date' => 'date',
            'returned_date' => 'date'
        ]);

        $issuedEquipment->update($validated);
        return response()->json($issuedEquipment, 200);
    }

    public function destroy(Issued_equipment $issuedEquipment)
    {
        $issuedEquipment->delete();
        return response()->json(null, 204);
    }
}
