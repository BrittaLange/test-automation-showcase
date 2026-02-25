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

  		// Arrange Test Data.
		String name = "John Wayne";
		String location = "Denver";

		// Act - Test steps.
		WebElement inputName = driver.findElement(By.id("inputName"));
		WebElement inputLocation = driver.findElement(By.id("inputLocation"));
		WebElement submitButton = driver.findElement(By.name("save"));
		inputName.sendKeys(name);
		inputLocation.sendKeys(location);
		submitButton.click();

		// Assert.
		// Expect success message to be displayed.
		WebElement message = driver.findElement(By.className("alert"));
		String actualMessage = message.getText();
		assertEquals("New customer has been saved.", actualMessage);

		// Expect customer to be displayed in table.
		WebElement lastRowFirstCol = driver.findElement(By.xpath("//table/tbody/tr[last()]/td[1]"));
		assertEquals(name, lastRowFirstCol.getText());
		WebElement lastRowSecondCol = driver.findElement(By.xpath("//table/tbody/tr[last()]/td[2]"));
		assertEquals(location, lastRowSecondCol.getText());
	}

	@AfterEach
	public final void teardown() {
		// Delete new customer.
		WebElement deleteButton = driver.findElement(By.xpath("//table/tbody/tr[last()]/td[3]/a[text()=\"Delete\"]"));
		deleteButton.click();

		if (driver != null) {
			driver.quit();
		}
	}
}