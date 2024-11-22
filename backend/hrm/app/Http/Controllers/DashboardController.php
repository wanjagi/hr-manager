<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Equipment;
use Illuminate\Http\Request;
use App\Models\AllEquipments;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //
    public function dashboardData()
{
    $totalEmployees = Employee::count();
    $totalEquipments = AllEquipments::count();
    $issuedEquipments = Equipment::whereNotNull('employee_id')->count();
    //$availableEquipments = Equipment::whereNull('employee_id')->count();
    $availableEquipments = $totalEquipments - $issuedEquipments;
    

    


    return response()->json([
        'totalEmployees' => $totalEmployees,
        'totalEquipments' => $totalEquipments,
        'issuedEquipments' => $issuedEquipments,
        'availableEquipments' => $availableEquipments
    ]);
}

}
