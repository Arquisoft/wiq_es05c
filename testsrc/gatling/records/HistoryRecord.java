
import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class HistoryRecord extends Simulation {

  private HttpProtocolBuilder httpProtocol = http
    .baseUrl("http://20.90.117.30:8000")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");
  
  private Map<CharSequence, String> headers_0 = Map.ofEntries(
    Map.entry("Cache-Control", "no-cache"),
    Map.entry("Content-Type", "application/ocsp-request"),
    Map.entry("Pragma", "no-cache")
  );
  
  private Map<CharSequence, String> headers_1 = Map.ofEntries(
    Map.entry("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"),
    Map.entry("If-None-Match", "\"57b6aa454590cf8b6775a507b1e36e553221d799\""),
    Map.entry("Upgrade-Insecure-Requests", "1")
  );
  
  private Map<CharSequence, String> headers_2 = Map.of("Origin", "http://20.90.117.30:3000");
  
  private Map<CharSequence, String> headers_3 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"c1028168af42477a2e41c1eff9fc3ef2a7e17be0\"")
  );
  
  private Map<CharSequence, String> headers_4 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"f64d1c4090a4330a4dc9c5b29c6c8595fdfc5eb1\"")
  );
  
  private Map<CharSequence, String> headers_5 = Map.ofEntries(
    Map.entry("Content-type", "text/plain;charset=UTF-8"),
    Map.entry("Origin", "http://20.90.117.30:3000")
  );
  
  private Map<CharSequence, String> headers_7 = Map.ofEntries(
    Map.entry("Access-Control-Request-Headers", "content-type"),
    Map.entry("Access-Control-Request-Method", "POST"),
    Map.entry("Origin", "http://20.90.117.30:3000")
  );
  
  private Map<CharSequence, String> headers_8 = Map.ofEntries(
    Map.entry("Accept", "application/json, text/plain, */*"),
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "http://20.90.117.30:3000")
  );
  
  private Map<CharSequence, String> headers_9 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"7d8add571a6b815ecdab7f3efcca0baf44ba9ec0\"")
  );
  
  private String uri1 = "20.90.117.30";
  
  private String uri2 = "http://r3.o.lencr.org";

  private ScenarioBuilder scn = scenario("HistoryRecord")
    .exec(
      http("request_0")
        .post(uri2 + "/")
        .headers(headers_0)
        .body(RawFileBody("historyrecord/0000_request.dat")),
      pause(4),
      http("request_1")
        .get("http://" + uri1 + ":3000/")
        .headers(headers_1)
        .resources(
          http("request_2")
            .get("http://" + uri1 + ":8005/socket.io/?EIO=4&transport=polling&t=OyMfpyJ")
            .headers(headers_2),
          http("request_3")
            .get("http://" + uri1 + ":3000/logoEii.png")
            .headers(headers_3),
          http("request_4")
            .get("http://" + uri1 + ":3000/logoGitHub.png")
            .headers(headers_4),
          http("request_5")
            .post("http://" + uri1 + ":8005/socket.io/?EIO=4&transport=polling&t=OyMfpzv&sid=o67mn_LmUVu75EzWAAAe")
            .headers(headers_5)
            .body(RawFileBody("historyrecord/0005_request.html")),
          http("request_6")
            .get("http://" + uri1 + ":8005/socket.io/?EIO=4&transport=polling&t=OyMfpzw&sid=o67mn_LmUVu75EzWAAAe")
            .headers(headers_2)
        ),
      pause(17),
      http("request_7")
        .options("/login")
        .headers(headers_7)
        .resources(
          http("request_8")
            .post("/login")
            .headers(headers_8)
            .body(RawFileBody("historyrecord/0008_request.json")),
          http("request_9")
            .get("http://" + uri1 + ":3000/icon.jpg")
            .headers(headers_9)
        ),
      pause(2),
      http("request_10")
        .get("/getHistoryTotal?usuario=Gatling")
        .headers(headers_2)
        .resources(
          http("request_11")
            .get("/getHistoryDetallado?usuario=Gatling")
            .headers(headers_2),
          http("request_12")
            .get("http://" + uri1 + ":8005/socket.io/?EIO=4&transport=polling&t=OyMfp_H&sid=o67mn_LmUVu75EzWAAAe")
            .headers(headers_2),
          http("request_13")
            .post("http://" + uri1 + ":8005/socket.io/?EIO=4&transport=polling&t=OyMfw4e&sid=o67mn_LmUVu75EzWAAAe")
            .headers(headers_5)
            .body(RawFileBody("historyrecord/0013_request.html"))
        )
    );

  {
	  setUp(scn.injectOpen(constantUsersPerSec(5).during(60).randomized())).protocols(httpProtocol);
  }
}
