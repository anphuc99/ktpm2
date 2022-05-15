<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\SanPham;
use App\Model\HinhAnh;

class IndexController extends Controller
{
    //
    public function index(){
        $sanPhamMoi = SanPham::orderBy("created_at","DESC")->paginate(6);
        $products = [];
        foreach($sanPhamMoi as $sp){
            array_push($products,[
                "title" => $sp->TENSP,
                "price" => $sp->GIAMGIA,
                "desciption" => $sp->NOIDUNG,
                "img" => asset(HinhAnh::where("id",$sp->HINHDAIDIEN)->first()->URL),
                "review" => 5,
                "detail" => $sp->DUONGDAN,
                "summary" => $sp->NDTOMTAT
            ]);
        }
        return response()->json($products);
    }

    public function detail($id){
        $sp = SanPham::where("DUONGDAN",$id)->first();
        $products = [
            "id" => $sp->id,
            "title" => $sp->TENSP,
            "price" => $sp->GIABAN,
            "discount" => $sp->GIAMGIA,
            "desciption" => $sp->NOIDUNG,
            "img" => asset(HinhAnh::where("id",$sp->HINHDAIDIEN)->first()->URL),
            "review" => 5,
            "detail" => $sp->DUONGDAN,
            "summary" => $sp->NDTOMTAT
        ];
        return response()->json($products);
    }
}
