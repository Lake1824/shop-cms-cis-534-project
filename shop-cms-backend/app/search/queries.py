from typing import Any


def get_all_docs_query()-> dict[str, Any]:
    return {
        "size": 50,
        "query": {
            "match_all": {}
        }
    }

def build_get_all_restaurant_feedback_query(restaurant_id: str) -> dict[str, Any]:
    return {
        "size": 50,
        "query": {
            "bool": {
                "must": [
                    {
                        "term": {
                            "restaurant_id": restaurant_id
                        }
                    }
                ]
            }
        }
    }

def build_get_all_restaurants_menu_query(restaurant_id: str) -> dict[str, Any]:
    return {
        "size": 50,
        "query": {
            "bool": {
                "must": [
                    {
                        "term": {
                            "restaurant_id": restaurant_id
                        }
                    }
                ]
            }
        }
    }

def build_get_restaurant_featured_feedback_query(restaurant_id: str) -> dict[str, Any]:
    return {
        "size": 50,
        "query": {
            "bool": {
                "must": [
                    {
                        "term": {
                            "restaurant_id": restaurant_id
                        }
                    },
                    {
                        "term": {
                            "featured": True
                        }
                    }
                ]
            }
        }
    }

def build_search_for_restaurants_by_name_query(search_query: str) -> dict[str, Any]:
    return {
        "size": 50,
        "query": {
            "bool": {
                "should": [
                    {
                        "match": {
                            "name": {
                                "query": search_query,
                                "fuzziness": "AUTO"
                            }
                        }
                    },
                    {
                        "term": {
                            "name.keyword": search_query.lower()
                        }
                    }
                ]
            }
        }
    }

def build_search_for_restaurants_products_by_name_query(search_query: str, restaurant_id: str) -> dict[str, Any]:
    return {
        "_source": False,
        "size": 50,
        "query": {
            "bool": {
                "must": [
                    {
                        "term": {
                            "restaurant_id": restaurant_id
                        }
                    },
                    {
                        "nested": {
                            "path": "products",
                            "query": {
                                "bool": {
                                    "should": [
                                        {
                                            "match": {
                                                "products.name": {
                                                    "query": search_query,
                                                    "fuzziness": "AUTO"
                                                }
                                            }
                                        },
                                        {
                                            "term": {
                                                "products.name.keyword": search_query
                                            }
                                        }
                                    ]
                                }
                            },
                            "inner_hits": {}
                        }
                    }
                ]
            }
        }
    }


def build_search_for_products_by_name_query(search_query: str) -> dict[str, Any]:
    return {
        "_source": False,
        "size": 50,
        "query": {
            "nested": {
                "path": "products",
                "query": {
                    "bool": {
                        "should": [
                            {
                                "match": {
                                    "products.name": {
                                        "query": search_query,
                                        "fuzziness": "AUTO"
                                    }
                                }
                            },
                            {
                                "term": {
                                    "products.name.keyword": search_query.lower()
                                }
                            }
                        ],
                    }
                },
                "inner_hits": {}
            }
        }
    }
