<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\Model\HinhAnh;
use App\Model\ThuongHieu;
use Illuminate\Database\Eloquent\SoftDeletes;
class SanPham extends Model
{
    //
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function HinhAnh(){
        $hinhAnh = HinhAnh::where("id",$this->HINHDAIDIEN)->first();
        return $hinhAnh;
    }
    public function ThuongHieu(){
        $thuongHieu = ThuongHieu::where("id",$this->MATHUONGHIEU)->first();
        return $thuongHieu;
    }
    public function SanPhamTuongTu(){
        $sanPham = SanPham::where("MATHUONGHIEU",$this->MATHUONGHIEU)->orderBy("created_at","DESC")->paginate(3);
        return $sanPham;
    }
}
