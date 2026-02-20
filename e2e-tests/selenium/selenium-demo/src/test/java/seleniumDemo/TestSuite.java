package seleniumDemo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class TestSuite {

	WebDriver driver;

	@BeforeEach
	public void setup() {
		driver = new ChromeDriver();
	}

	@Test
	public void shouldCreateCustomerWithValidData() {

		driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
		driver.get("http://localhost/simple-crud-webapp/app/");

		String title = driver.getTitle();
		assertEquals("Simple CRUD Web App", title);

		String name = "John Wayne";
		String location = "Denver";

		WebElement inputName = driver.findElement(By.id("inputName"));
		WebElement inputLocation = driver.findElement(By.id("inputLocation"));
		WebElement submitButton = driver.findElement(By.name("save"));

		inputName.sendKeys(name);
		inputLocation.sendKeys(location);
		submitButton.click();

		WebElement message = driver.findElement(By.className("alert"));
		String value = message.getText();
		assertEquals("New customer has been saved.", value);

	}

	@AfterEach
	public final void teardown() {
		if (driver != null) {
			driver.quit();
		}
	}
}