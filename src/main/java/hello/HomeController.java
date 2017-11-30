package hello;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by vuquocdat on 11/30/17.
 */


@Controller
public class HomeController {

    @RequestMapping(value = "/home")
    public String index() {
        return "index";
    }
}