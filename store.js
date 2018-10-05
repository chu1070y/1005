
//dao 클래스처럼 만들어준다.
var dao = (function (map){

    var map = map;

    var arr = [
        {title:'고기팩토리',lat:37.569820, lng: 126.986001},
        {title:'갓덴스시',lat:37.569081,lng:126.985591},
        {title:'코다차야',lat:37.569949,lng:126.985049},
        {title:'롯데리아',lat:37.569857,lng:126.984923},
        {title:'초밥의신부타',lat:37.569440,lng:126.987367},
        {title:'청진식당',lat:37.570515,lng:126.985710},
        {title:'에머이',lat:37.570031,lng:126.984601},
        {title:'쿠킨스테이크',lat:37.569934,lng:126.985787},
        {title:'서브웨이',lat:37.570325,lng:126.985932},
        {title:'미스터시래기',lat:37.573029,lng:126.985420}
    ];

    function clearMarkers(){
        for (var store of arr){
            if(store.marker){
                store.marker.setMap(null);
            }
        }
    }

    function clone(origin) {
        var result = [];

        for(var obj of origin){
            result.push(obj);
        }
        return result;
    }


    function findNNStore(){
        /*거리 공식을 함수로 만들어줌*/
        function calcDistance(p1, p2) {
            return Math.sqrt(Math.pow(p1.lat - p2.lat,2) +
                Math.pow(p1.lng - p2.lng,2)
            );
        }

        //클론을 정렬한다. 왜냐하면 원 배열을 sorting하면 idx값이 뒤엉키기 때문이다.
        var target = clone(arr);
        /*현재 내 위치와 거리를 정렬*/
        target.sort(function (a, b) {
            var d1 = calcDistance(current, a) * 100000000;
            var d2 = calcDistance(current, b) * 100000000;
            return d1 - d2;
        });
        return target[0];
    }


    function getList(callback) {
        callback(arr);
    }

    function showMarker(idx) {

        clearMarkers();

        var store = arr[idx];

        if(!store.marker) {
            store.marker = new daum.maps.Marker({
                position: new daum.maps.LatLng(store.lat,store.lng),
                map:map
            });
        }else {
            store.marker.setMap(map);
        }

    }

    //getList라는 메소드를 호출하는 것이다.
    return {
        getList:getList,
        showMarker:showMarker,
        findNNStore:findNNStore
    }

})(map);