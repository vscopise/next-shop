export interface Media {
    id:             number;
    date:           Date;
    date_gmt:       Date;
    guid:           Caption;
    modified:       Date;
    modified_gmt:   Date;
    slug:           string;
    status:         string;
    type:           string;
    link:           string;
    title:          Caption;
    author:         number;
    featured_media: number;
    comment_status: string;
    ping_status:    string;
    template:       string;
    meta:           string[];
    class_list:     string[];
    description:    Caption;
    caption:        Caption;
    alt_text:       string;
    media_type:     string;
    mime_type:      string;
    media_details:  MediaDetails;
    post:           null;
    source_url:     string;
    _links:         Links;
}

export interface Links {
    self:       Self[];
    collection: About[];
    about:      About[];
    author:     Author[];
    replies:    Author[];
}

export interface About {
    href: string;
}

export interface Author {
    embeddable: boolean;
    href:       string;
}

export interface Self {
    href:        string;
    targetHints: TargetHints;
}

export interface TargetHints {
    allow: string[];
}

export interface Caption {
    rendered: string;
}

export interface MediaDetails {
    width:      number;
    height:     number;
    file:       string;
    filesize:   number;
    sizes:      Sizes;
    image_meta: ImageMeta;
}

export interface ImageMeta {
    aperture:          string;
    credit:            string;
    camera:            string;
    caption:           string;
    created_timestamp: string;
    copyright:         string;
    focal_length:      string;
    iso:               string;
    shutter_speed:     string;
    title:             string;
    orientation:       string;
    keywords:          string[];
}

export interface Sizes {
    medium:                        The1536_X1536;
    large:                         The1536_X1536;
    thumbnail:                     The1536_X1536;
    medium_large:                  The1536_X1536;
    "1536x1536":                   The1536_X1536;
    woocommerce_thumbnail:         The1536_X1536;
    woocommerce_single:            The1536_X1536;
    woocommerce_gallery_thumbnail: The1536_X1536;
    full:                          The1536_X1536;
}

export interface The1536_X1536 {
    file:       string;
    width:      number;
    height:     number;
    filesize?:  number;
    mime_type:  string;
    source_url: string;
    uncropped?: boolean;
}
