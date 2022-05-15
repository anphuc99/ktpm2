<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\SanPham;
use App\Model\HinhAnh;
use App\Model\ThuongHieu;
use Illuminate\Support\Facades\DB;
use App\Model\DonHang;
use App\Model\CT_DonHang;
use App\User;
use Exception;

class ProductController extends Controller
{
    public function getProduct($categogy)
    {
        $products = [];
        if ($categogy == "all") {
            $sanPhamMoi = SanPham::orderBy("created_at", "DESC")->paginate(6);
            $count = SanPham::orderBy("created_at", "DESC")->get();
            foreach ($sanPhamMoi as $sp) {
                array_push($products, [
                    "title" => $sp->TENSP,
                    "price" => $sp->GIAMGIA,
                    "img" => asset(HinhAnh::where("id", $sp->HINHDAIDIEN)->first()->URL),
                    "review" => 5,
                    "detail" => $sp->DUONGDAN,
                    "summary" => $sp->NDTOMTAT,
                    "category" => $sp->MATHUONGHIEU
                ]);
            }
            return response()->json([$products, count($count)]);
        } else {
            $thuongHieu = ThuongHieu::where("DUONGDAN", $categogy)->first();
            $sanPhamMoi = SanPham::where("MATHUONGHIEU", $thuongHieu->id)->orderBy("created_at", "DESC")->paginate(6);
            $count = SanPham::where("MATHUONGHIEU", $thuongHieu->id)->get();
            foreach ($sanPhamMoi as $sp) {
                array_push($products, [
                    "title" => $sp->TENSP,
                    "price" => $sp->GIAMGIA,
                    "img" => asset(HinhAnh::where("id", $sp->HINHDAIDIEN)->first()->URL),
                    "review" => 5,
                    "detail" => $sp->DUONGDAN,
                    "summary" => $sp->NDTOMTAT,
                    "category" => $sp->MATHUONGHIEU
                ]);
            }
            return response()->json([$products, count($count)]);
        }
    }

    public function getCategory()
    {
        $thuongHieu = ThuongHieu::all();
        $categogys = [];
        foreach ($thuongHieu as $th) {
            array_push($categogys, [
                "id" => $th->id,
                "name" => $th->TENTHUONGHIEU,
                "path" => $th->DUONGDAN
            ]);
        }
        return response()->json($categogys);
    }

    public function cart(Request $request)
    {
        try{
            $carts = $request->cart;
            $product = [];
            foreach ($carts as $cart) {
                $sp = SanPham::where("id", $cart["id"])->first();
                array_push($product, [
                    "id" => $sp->id,
                    "title" => $sp->TENSP,
                    "price" => $sp->GIAMGIA,
                    "img" => asset(HinhAnh::where("id", $sp->HINHDAIDIEN)->first()->URL),
                    "review" => 5,
                    "detail" => $sp->DUONGDAN,
                    "summary" => $sp->NDTOMTAT,
                    "category" => $sp->MATHUONGHIEU,
                    "amount" => $cart["amount"]
                ]);
            }
            return response()->json($product);
        }
        catch(Exception $e){
            return response()->json([$e->getMessage()]);
        }
    }

    public function checkCount(Request $request)
    {
        try{
            $cart = $request->cart;
            $info = $request->info;
            if(count($cart) > 0){
                DB::beginTransaction();
                $u = User::create([
                    "HOTEN" => $info["name"],
                    "SDT" => $info["number"],
                    "email" => $info["email"],
                ]);
                $donHang = new DonHang();
                $donHang->MANGUOIDUNG = $u->id;
                $donHang->DIACHIGIAOHANG = $info["address"];
                $donHang->GHICHU = $info["note"];
                $donHang->TRANGTHAI = "Khởi tạo";
                $donHang->save();
                foreach($cart as $c){
                    $ctDonHang = new CT_DonHang();
                    $ctDonHang->SODONHANG = $donHang->id;
                    $ctDonHang->MASANPHAM = $c["id"];
                    $ctDonHang->SOLUONG = $c["amount"];
                    $sp = SanPham::where("id",$c["id"])->first();
                    $ctDonHang->GIABAN = $sp->GIABAN;
                    $ctDonHang->GIAKHUYENMAI = $sp->GIAMGIA;
                    $ctDonHang->save();
                }
                DB::commit();
                return response()->json(["rs" => true]);
            }
        }catch(Exception $e){
            DB::rollback();
            return response()->json(["rs" => false ,"msg" => $e->getMessage()]);
        }
    }
}
