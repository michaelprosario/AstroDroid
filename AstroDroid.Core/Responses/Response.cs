using System.Collections.Generic;
using System.Runtime.Serialization;
using FluentValidation.Results;

namespace AstroDroid.Core.Responses
{
    public enum ResponseCode
    {
        Success = 200,
        NotFound = 404,
        BadRequest = 400,
        Error = 405
    }

    [DataContract]
    public class Response
    {
        public Response()
        {
            Code = ResponseCode.Success;
            Message = "";
        }

        [DataMember] public ResponseCode Code { get; set; }

        [DataMember] public string Message { get; set; }

        [DataMember] public IList<ValidationFailure> ValidationErrors { get; set; }
    }
}