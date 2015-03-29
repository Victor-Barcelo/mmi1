<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Lib\Scraper;

class MainController extends Controller
{
    /**
     * @Route("/api/login", name="login")
     */
    public function login(Request $request)
    {
        $login = $request->request->get('login');
        $password = $request->request->get('password');
        if ($login == 'pepe') {
            $role = 'admin';
        } else {
            $role = 'user';
        }
        $return = json_encode(
            array(
                "success" => true,
                "userInfo" => array("role" => $role, "login" => $login)
            )
        );

        return new Response(
            $return, 200, array('Content-Type' => 'application/json')
        );
    }

    /**
     * @Route("/api/getNewsFeed/{langTo}/{sources}", name="getNews")
     */
    public function getNewsFeed($langTo, $sources, $langTo)
    {

        $sources = json_decode(html_entity_decode($sources), true);

        $news = array();
        $newsWebs = array();

        if ($sources['El Confidencial']) {
            $newsWebs[] = (array(
                'url' => 'http://www.elconfidencial.com/ultima-hora-en-vivo/',
                'selector' => 'body > main > div > section > div > nav > div.leftblock > div > article > div > div.title-box > h2 > a'
            ));
        };
        if ($sources['El País']) {
            $newsWebs[] = (array(
                'url' => 'http://elpais.com/tag/fecha/ultimahora/',
                'selector' => '#portadilla_seccion_automatica > div.contenedor_principal > div.contenido_principal.estirar > div.columnas_principal_y_secundaria > div.division_columnas.estirar > div.columna_principal  h2 > a'
            ));
        };
        if ($sources['El Economista']) {
            $newsWebs[] = (array('url' => 'http://www.eleconomista.es/noticias/', 'selector' => '#noti-cat  h1 a'));
        };

        foreach ($newsWebs as $web) {
            $sc = new Scraper('es', $langTo, $web['selector'], $web['url']);
            $news[] = $sc->getNodes();
        }

        $return = json_encode(array("news" => $news));

        return new Response(
            $return, 200, array('Content-Type' => 'application/json')
        );
    }
}