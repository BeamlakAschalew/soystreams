<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RadioCategoryItemController extends Controller {
    public function __invoke(Request $request, $channel) {
        switch ($channel) {
            case 'music':
                $controller = app(MusicRadioController::class);

                return $controller();
                break;

            default:
                // code...
                break;
        }
    }
}
