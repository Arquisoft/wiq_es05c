
import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class PlayGameRecord extends Simulation {

  private HttpProtocolBuilder httpProtocol = http
    .baseUrl("http://20.90.117.30:8000")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");
  
  private Map<CharSequence, String> headers_0 = Map.ofEntries(
    Map.entry("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"),
    Map.entry("If-None-Match", "\"b740a4b71ab2c4535560cd4f326aaaedd88a5747\""),
    Map.entry("Upgrade-Insecure-Requests", "1")
  );
  
  private Map<CharSequence, String> headers_1 = Map.of("If-None-Match", "\"2394e1c10ab2dd020399a4b5af724f68e7284c54\"");
  
  private Map<CharSequence, String> headers_2 = Map.ofEntries(
    Map.entry("Accept", "text/css,*/*;q=0.1"),
    Map.entry("If-None-Match", "\"d74f3146ca1eaa6ce070e1568ebc6ad5d75128f1\"")
  );
  
  private Map<CharSequence, String> headers_3 = Map.of("Origin", "http://20.90.117.30:3000");
  
  private Map<CharSequence, String> headers_4 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"f64d1c4090a4330a4dc9c5b29c6c8595fdfc5eb1\"")
  );
  
  private Map<CharSequence, String> headers_5 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"c1028168af42477a2e41c1eff9fc3ef2a7e17be0\"")
  );
  
  private Map<CharSequence, String> headers_6 = Map.ofEntries(
    Map.entry("Content-type", "text/plain;charset=UTF-8"),
    Map.entry("Origin", "http://20.90.117.30:3000")
  );
  
  private Map<CharSequence, String> headers_8 = Map.ofEntries(
    Map.entry("Access-Control-Request-Headers", "content-type"),
    Map.entry("Access-Control-Request-Method", "POST"),
    Map.entry("Origin", "http://20.90.117.30:3000")
  );
  
  private Map<CharSequence, String> headers_9 = Map.ofEntries(
    Map.entry("Accept", "application/json, text/plain, */*"),
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "http://20.90.117.30:3000")
  );
  
  private Map<CharSequence, String> headers_10 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"7d8add571a6b815ecdab7f3efcca0baf44ba9ec0\"")
  );
  
  private Map<CharSequence, String> headers_11 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"44d93fd3452c72b5640086e8d1d9f35da691b288\"")
  );
  
  private Map<CharSequence, String> headers_12 = Map.ofEntries(
    Map.entry("If-None-Match", "W/\"b82-zLEmJVxmgBAj+vFkBGGUsQUF4Gc\""),
    Map.entry("Origin", "http://20.90.117.30:3000")
  );
  
  private String uri1 = "20.90.117.30";

  private ScenarioBuilder scn = scenario("PlayGameRecord")
    .exec(
      http("request_0")
        .get("http://" + uri1 + ":3000/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("http://" + uri1 + ":3000/static/js/main.4a961c5c.js")
            .headers(headers_1),
          http("request_2")
            .get("http://" + uri1 + ":3000/static/css/main.18e3ef94.css")
            .headers(headers_2),
          http("request_3")
            .get("http://" + uri1 + ":8005/socket.io/?EIO=4&transport=polling&t=OyQRsGC")
            .headers(headers_3),
          http("request_4")
            .get("http://" + uri1 + ":3000/logoGitHub.png")
            .headers(headers_4),
          http("request_5")
            .get("http://" + uri1 + ":3000/logoEii.png")
            .headers(headers_5),
          http("request_6")
            .post("http://" + uri1 + ":8005/socket.io/?EIO=4&transport=polling&t=OyQRsHp&sid=-VrpSNQ-UX0zUamsAALA")
            .headers(headers_6)
            .body(RawFileBody("playgamerecord/0006_request.html")),
          http("request_7")
            .get("http://" + uri1 + ":8005/socket.io/?EIO=4&transport=polling&t=OyQRsHp.0&sid=-VrpSNQ-UX0zUamsAALA")
            .headers(headers_3)
        ),
      pause(15),
      http("request_8")
        .options("/login")
        .headers(headers_8)
        .resources(
          http("request_9")
            .post("/login")
            .headers(headers_9)
            .body(RawFileBody("playgamerecord/0009_request.json")),
          http("request_10")
            .get("http://" + uri1 + ":3000/icon.jpg")
            .headers(headers_10)
        ),
      pause(5),
      http("request_11")
        .get("http://" + uri1 + ":3000/wiq3.jpg")
        .headers(headers_11),
      pause(1),
      http("request_12")
        .get("/getQuestionModoBasico?idioma=es")
        .headers(headers_12)
        .resources(
          http("request_13")
            .get("http://" + uri1 + ":8005/socket.io/?EIO=4&transport=polling&t=OyQRsJf&sid=-VrpSNQ-UX0zUamsAALA")
            .headers(headers_3),
          http("request_14")
            .post("http://" + uri1 + ":8005/socket.io/?EIO=4&transport=polling&t=OyQRyOI&sid=-VrpSNQ-UX0zUamsAALA")
            .headers(headers_6)
            .body(RawFileBody("playgamerecord/0014_request.html"))
        ),
      pause(4),
      http("request_15")
        .options("/updateHistory")
        .headers(headers_8)
        .resources(
          http("request_16")
            .options("/updateHistory")
            .headers(headers_8),
          http("request_17")
            .options("/updateHistory")
            .headers(headers_8)
        )
    );

  {
	  setUp(scn.injectOpen(constantUsersPerSec(5).during(60).randomized())).protocols(httpProtocol);
  }
}
