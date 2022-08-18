export class MapUtile {

    constructor(map) {
        const mapOptions = {
            center: new naver.maps.LatLng(35.5352, 129.3109),
            zoom: 8
        };
        this.map = new naver.maps.Map('map', mapOptions);
    }

    //마커 생성
    makeMarker(data, selectedPageNum, onePageNum) {
        if(this.markers) {
            this.markers.forEach(ele => {
                ele.setMap(null);
            })
        }

        data.forEach((ele, idx) => {
            const markerOptions = {
                map: this.map,
                position: new naver.maps.LatLng(ele.faciPointY, ele.faciPointX)
            }
            this.markers = new naver.maps.Marker(markerOptions);
        });
    }

    moveMap() {

    }

    //주소 -> 좌표
    AddressToLatLng(address) {
        naver.maps.Service.geocode({
            query: address
        }, function(status, response) {
            if (status === naver.maps.Service.Status.ERROR) {
                if (!address) {
                    return alert('Geocode Error, Please check address');
                }
                return alert('Geocode Error, address:' + address);
            }

            if (response.v2.meta.totalCount === 0) {
                return alert('No result.');
            }

            var htmlAddresses = [],
                item = response.v2.addresses[0],
                point = new naver.maps.Point(item.x, item.y);

            if (item.roadAddress) {
                htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
            }

            if (item.jibunAddress) {
                htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
            }

            if (item.englishAddress) {
                htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
            }

            infoWindow.setContent([
                '<div style="padding:10px;min-width:200px;line-height:150%;">',
                '<h4 style="margin-top:5px;">검색 주소 : '+ address +'</h4><br />',
                htmlAddresses.join('<br />'),
                '</div>'
            ].join('\n'));

            map.setCenter(point);
            infoWindow.open(map, point);
        });
    }

    //좌표 -> 주소
    LatLenToAddress(latlng) {

        infoWindow.close();

        naver.maps.Service.reverseGeocode({
            coords: latlng,
            orders: [
                naver.maps.Service.OrderType.ADDR,
                naver.maps.Service.OrderType.ROAD_ADDR
            ].join(',')
        }, function(status, response) {
            if (status === naver.maps.Service.Status.ERROR) {
                if (!latlng) {
                    return alert('ReverseGeocode Error, Please check latlng');
                }
                if (latlng.toString) {
                    return alert('ReverseGeocode Error, latlng:' + latlng.toString());
                }
                if (latlng.x && latlng.y) {
                    return alert('ReverseGeocode Error, x:' + latlng.x + ', y:' + latlng.y);
                }
                return alert('ReverseGeocode Error, Please check latlng');
            }

            var address = response.v2.address,
                htmlAddresses = [];

            if (address.jibunAddress !== '') {
                htmlAddresses.push('[지번 주소] ' + address.jibunAddress);
            }

            if (address.roadAddress !== '') {
                htmlAddresses.push('[도로명 주소] ' + address.roadAddress);
            }

            infoWindow.setContent([
                '<div style="padding:10px;min-width:200px;line-height:150%;">',
                '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                htmlAddresses.join('<br />'),
                '</div>'
            ].join('\n'));

            infoWindow.open(map, latlng);
        });
    }


}




