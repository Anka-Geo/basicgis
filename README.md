# Started

cd .. && ng new --package-manager yarn --style scss --skip-tests true --prefix bg basicgis

# INFO

sidebar üzerinden veriyi değiştiriyoruz map üzerinden o veriyi işliyoruz.
sidebar layer'ın visible'ını true, false yapıyor.

# DAY 2

=> layer.service.ts üzerinden url içerisinde ki verileri alıyoruz ve services'e atıyoruz.
=> daha sonsrasında aldığımız verileri tile-layer.directive'in içerisinde sadece service.type'ı vector olanları layer.directive'e yönlendiriyoruz.
=> tile-layer.directive'de vector serviceslerinin url'ine wms isteği atıyoruz.
=> daha sonrasında layer directive'e yönlendirirken layer.directive'e layer'ın visible ve name değerlerini gönderiyoruz.
=> daha sonra bu visible değerine göre tile-layer.directive'mizin params ve visible değerlerini değiştirerek harita üzerinde ki gösterimi düzenleyebiliyoruz.