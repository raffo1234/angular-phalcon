<?php

class Proyecto extends \Phalcon\Mvc\Model {

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var string
     */
    public $title;
    public $slug;

    /**
     *
     * @var string
     */
    public $image;
    public $image_large;
    public $color;
    public $url;

//    public function initialize() {
//        $this->skipAttributes(
//                array(
//                    'id'
//                )
//        );
//    }

    /**
     * Independent Column Mapping.
     * Keys are the real names in the table and the values their names in the application
     *
     * @return array
     */
    public function columnMap() {
        return array(
            'id' => 'id',
            'title' => 'title',
            'slug' => 'slug',
            'image' => 'image',
            'image_large' => 'image_large',
            'color' => 'color',
            'url' => 'url'
        );
    }

}
