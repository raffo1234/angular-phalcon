<?php

class ProyectosajaxController extends \Phalcon\Mvc\Controller {

    private $_proyectos = array();

    public function getproyectosAction($slug = null) {

        $this->view->disable();

        if ($this->request->isGet() == true) {

            if (!isset($slug)) {
                $proyectos = Proyecto::find(array(
                    'order' => "id DESC"
                ));
            } else {
                $proyectos = Proyecto::find(array(
                            "slug = '$slug'",
                            "limit" => 1
                ));
            }

            if (count($proyectos) <= 0) {
                echo "false";
                return;
            }

            foreach ($proyectos as $proyecto) {
                $this->_proyectos[] = $proyecto;
            }

            $this->response->setJsonContent(array("proyectos" => $this->_proyectos));
            $this->response->setStatusCode(200, "OK");
            $this->response->send();
        } else {
            $this->response->setStatusCode(404, "Not found");
        }
    }

    public function insertarproyectoAction() {

        $proyecto = new Proyecto;
        $proyecto->id = null;
        $proyecto->title = "Proyecto n";
        $proyecto->slug = "proyecto-69";
        $proyecto->image = "assets/images/proyecto_1.jpg";
        $proyecto->color = "#f2f2f2";

        if ($proyecto->save() == false) {
            foreach ($proyecto->getMessages() as $message) {
                echo "Message: ", $message->getMessage() . "<br />";
                echo "Field: ", $message->getField() . "<br />";
                echo "Type: ", $message->getType() . "<br />";
            }
        }
    }

    public function mostrarproyectosAction() {
        $proyecto = Proyecto::find();
    }

    public function eliminarproyectoAction($id = null) {
        echo "eliminar!" . $id;
    }

}
