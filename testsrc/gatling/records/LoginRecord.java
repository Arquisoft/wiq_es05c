
import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class LoginRecord extends Simulation {

  private HttpProtocolBuilder httpProtocol = http
    .baseUrl("http://20.90.117.30:3000")
    .inferHtmlResources()
    .acceptHeader("image/avif,image/webp,*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");
  
  private Map<CharSequence, String> headers_0 = Map.ofEntries(
    Map.entry("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"),
    Map.entry("Upgrade-Insecure-Requests", "1")
  );
  
  private Map<CharSequence, String> headers_4 = Map.ofEntries(
    Map.entry("Accept", "*/*"),
    Map.entry("Cache-Control", "no-cache"),
    Map.entry("Content-Type", "application/ocsp-request"),
    Map.entry("Pragma", "no-cache")
  );
  
  private Map<CharSequence, String> headers_5 = Map.ofEntries(
    Map.entry("Accept", "*/*"),
    Map.entry("Access-Control-Request-Headers", "content-type"),
    Map.entry("Access-Control-Request-Method", "POST"),
    Map.entry("Origin", "http://20.90.117.30:3000")
  );
  
  private Map<CharSequence, String> headers_6 = Map.ofEntries(
    Map.entry("Accept", "application/json, text/plain, */*"),
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "http://20.90.117.30:3000")
  );
  
  private String uri1 = "20.90.117.30";
  
  private String uri2 = "http://ocsp.digicert.com";

  private ScenarioBuilder scn = scenario("LoginRecord")
    .exec(
      http("request_0")
        .get("/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("/logoEii.png"),
          http("request_2")
            .get("/logoGitHub.png"),
          http("request_3")
            .get("/logo192.png")
        ),
      pause(18),
      http("request_4")
        .post(uri2 + "/")
        .headers(headers_4)
        .body(RawFileBody("loginrecord/0004_request.dat")),
      pause(9),
      http("request_5")
        .options("http://" + uri1 + ":8000/login")
        .headers(headers_5)
        .resources(
          http("request_6")
            .post("http://" + uri1 + ":8000/login")
            .headers(headers_6)
            .body(RawFileBody("loginrecord/0006_request.json")),
          http("request_7")
            .get("/icon.jpg")
        )
    );

  {
	  setUp(scn.injectOpen(constantUsersPerSec(5).during(60).randomized())).protocols(httpProtocol);
  }
}
