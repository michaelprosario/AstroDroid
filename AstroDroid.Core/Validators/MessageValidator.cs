using AstroDroid.Core.Interfaces;
using FluentValidation;

namespace AstroDroid.Core.Validators
{
    /// <summary>
    /// Validates node messages
    /// </summary>
    public class MessageValidator : AbstractValidator<INodeMessage>
    {
        public MessageValidator()
        {
            RuleFor(x => x.Sender).NotNull().NotEmpty();
            RuleFor(x => x.Topic).NotNull().NotEmpty();
            RuleFor(x => x.Type).NotNull().NotEmpty();
        }
    }
}