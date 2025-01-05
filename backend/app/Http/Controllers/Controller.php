<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use OpenApi\Annotations as OA;
/**
* @OA\Info(
* title="Order API",
* version="1.0.0",
* description="API Documentation for Order Management",
* termsOfService="https://www.example.com/terms",
* contact={
* "name"="Support Team",
* "email"="support@example.com",
* "url"="https://www.example.com/contact"
* },
* license={
* "name"="MIT",
* "url"="https://opensource.org/licenses/MIT"
* }
* )
*
* @OA\Server(
* url="http://interviews.test/api",
* description="Development API"
* )
*/

class Controller extends BaseController
{

    use AuthorizesRequests, ValidatesRequests;
}
