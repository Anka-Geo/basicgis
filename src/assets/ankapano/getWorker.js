

/* eslint-disable */
function getWorker() {

    function Test() {
        var TO_DEG = 180 / Math.PI
        var geographicToCartesian = function (center, point, camHegInPix, camHegInMet) {

            const TO_RAD = Math.PI / 180

            var lat = point.lat
            var lon = point.lon
            var alt = point.alt

            var cLat = center.lat
            var cLon = center.lon
            var cAlt = center.alt

            // Azimuth
            var phi1 = cLat * TO_RAD
            var phi2 = lat * TO_RAD
            var cosPhi2 = Math.cos(phi2)
            var dLmd = (lon - cLon) * TO_RAD
            var aci = Math.atan2(Math.sin(dLmd) * cosPhi2, Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * cosPhi2 * Math.cos(dLmd))
            var azimuth = (aci * TO_DEG) % 360
            var theta = (360 - azimuth) % 360
            // Azimuth End

            var R = 6371000 // metres
            var phi1 = cLat * TO_RAD
            var phi2 = lat * TO_RAD
            var deltaphi = (lat - cLat) * TO_RAD
            var deltalamda = (lon - cLon) * TO_RAD
            var a = Math.sin(deltaphi / 2) * Math.sin(deltaphi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltalamda / 2) * Math.sin(deltalamda / 2)
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            var dist = R * c

            var hip = (dist * Math.abs(camHegInPix)) / camHegInMet
            var rad = (360 - (theta + 90)) / 180 * Math.PI
            var altPx = ((alt - cAlt) * Math.abs(camHegInPix)) / camHegInMet

            var xx = hip * Math.cos(rad)
            var zz = hip * Math.sin(rad)
            var yy = altPx
            return { x: xx, y: yy, z: zz }
        }


        function startData() {
            var cartesianPoints = []
            var points = self._points
            var center = self._center
            var camHegInPix = self._cameraHeightInPX
            var camHegInMet = self._cameraHeightInMeter
            for (var i = 0; i < points.length; i++) {
                var point = points[i]
                var pt = { lat: point[1], lon: point[0], alt: point[2] }
                pt = geographicToCartesian(center, pt, camHegInPix, camHegInMet)
                cartesianPoints.push(pt)
            }
            postMessage({ type: 'CARTESIAN_POINTS', points: cartesianPoints })
        }

        self.onmessage = (message) => {
            var data = message.data
            if (data.type === 'SET_DATA') {
                self._points = data.points
                self._center = data.center
                self._cameraHeightInPX = data.cameraHeightInPX
                self._cameraHeightInMeter = data.cameraHeightInMeter
            } else if (data.type === 'START') {
                startData()
            }
        }
    };


    return [Test, ';\nTest()']
}


window.getWorker = getWorker

// export {getWorker}
