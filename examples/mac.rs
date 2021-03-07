use std::{fs, io::Write};

use skia_safe as sk;


fn main() {
    test_skia();
}

fn test_skia() {
    // let size = sk::ISize {
    //     width: 512,
    //     height: 512,
    // };
    // let raster_surface = sk::Surface::new_raster_n32_premul(size);
    // // let mut canvas = sk::Canvas::new(size, None).unwrap();
    // let mut canvas = raster_surface.
    // canvas.save();

    // let rect = sk::Rect::new(10.0, 10.0, 100.0, 100.0);
    // let mut paint = sk::Paint::default();
    // paint.set_color(sk::Color::BLUE);

    // canvas.draw_rect(rect, &paint);
    // canvas.restore();
    // let info = canvas.image_info();
    // println!("{:?}", info.dimensions());

    // // save to png
    // let mut bitmap = sk::Bitmap::new();
    // bitmap.alloc_n32_pixels((512, 512), false);
    // canvas.read_pixels(info, dst_pixels, dst_row_bytes, src_point)
    // let res = canvas.read_pixels_to_bitmap(&mut bitmap, sk::IPoint {x: 0, y: 0});
    // println!("result is: {}", res);
    // let data = bitmap.encode(sk::EncodedImageFormat::PNG, 0).unwrap();
    // // data.as_bytes()
    // let mut png = fs::File::create("test.png").unwrap();
    // png.write(data.as_bytes());
}

