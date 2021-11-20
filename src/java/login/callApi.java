package login;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;



public class callApi {
	
	
	
	public String getRcDetailsAyushmaan(String rcno) {
        String res = null;
        try {

            //String token = generateToken();
            OkHttpClient client = new OkHttpClient().newBuilder().connectTimeout(30, TimeUnit.SECONDS)
                    .build();
            MediaType mediaType = MediaType.parse("application/json");
            //RequestBody body = RequestBody.create(mediaType, "{\"ID_Type\":\"2\",\"ID_Number\":\"" + rcno + "\",\"Token\":\"" + token + "\",\"state_code\":\"16\",\"Beneficiary_Consent\":\"Y\",\r\n\"Auth_String\":\"adminTR\"}");
           // RequestBody body = RequestBody.create(mediaType, "{\"rcno\":\"" + rcno + "\"}");
            Request request = new Request.Builder()
                    .url("https://bmsuat.trsc.nic.in/ssotapi/webresources/services/getRCFamilyList?rcno="+rcno)
                    .method("GET", null)
                    .addHeader("Authorization", "Basic c3NvdEFwaVVzZXI6OTFYcUdUMmM1RVg2VXlOeGl1ejU1dz09")
                    .addHeader("Content-Type", "application/json")
                    .build();
            Response response = client.newCall(request).execute();

            res = response.body().string();

        } catch (IOException ex) {
            ex.getMessage();
        }
        return res;

    }

}
