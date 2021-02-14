using UnityEngine;

public class TestMovements : MonoBehaviour
{
    public GameObject Robot;
    public float Speed = 0.01f;
    private Rigidbody rigidbody;
    void Start()
    {
        rigidbody = Robot.GetComponent<Rigidbody>();
        //StartCoroutine(ExecuteMovement());
    }

    /*
    private IEnumerator ExecuteMovement()
    {
        for (var i = 0; i < 10; i++)
        {
            yield return StartCoroutine(MoveForward(Speed, 3));
            yield return StartCoroutine(SetHeading(90));
        }
    }

    private IEnumerator MoveForward(float speed)
    {
        rigidbody.velocity = Robot.transform.forward * speed;
        yield return null;
    }
    
    private IEnumerator MoveForward(float speed, float howLong)
    {
        rigidbody.velocity = Robot.transform.forward * speed;
        yield return new WaitForSeconds(howLong);
        rigidbody.velocity = Robot.transform.forward * 0f;
        yield return null;
    }

    private IEnumerator SetHeading(float degrees)
    {
        transform.Rotate(0, degrees, 0);
        yield return null;
    }*/
    
    void Update()
    {
        
    }
}
